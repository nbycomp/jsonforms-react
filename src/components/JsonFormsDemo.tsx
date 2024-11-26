import { useMemo, useState } from 'react';

import { UISchemaElement } from '@jsonforms/core';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useQueryState } from '../queryState';
import { SchemaInput } from './SchemaInput';

const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

const initialData = {};

const renderers = [...materialRenderers];

export function JsonFormsDemo() {
  const [data, setData] = useState<object>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const [schema, setSchema] = useQueryState('schema');
  const [uiSchema, setUiSchema] = useQueryState('uiSchema');

  let schemaObject: object;
  try {
    schemaObject = JSON.parse(schema || '');
  } catch {
    schemaObject = {};
  }

  let uiSchemaObject: UISchemaElement;
  try {
    uiSchemaObject = JSON.parse(uiSchema || '');
  } catch {
    uiSchemaObject = {
      type: '',
    };
  }

  const clearData = () => {
    setData({});
  };
  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}>
      <SchemaInput
        title="values.schema.json"
        value={schema}
        onChange={setSchema}
      />
      <SchemaInput
        title="uiSchema.json"
        value={uiSchema}
        onChange={setUiSchema}
      />
      <Grid item sm={6}>
        <Typography variant={'h4'}>Bound data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{stringifiedData}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={clearData}
          color="primary"
          variant="contained"
          data-testid="clear-data">
          Clear data
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Typography variant={'h4'}>Rendered form</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={schemaObject}
            uischema={uiSchemaObject}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        </div>
      </Grid>
    </Grid>
  );
}
