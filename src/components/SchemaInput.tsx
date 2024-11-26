import { Editor } from '@monaco-editor/react';
import { Grid, Typography } from '@mui/material';

interface SchemaInputProps {
  title: string;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
}

export function SchemaInput({ title, value, onChange }: SchemaInputProps) {
  return (
    <Grid item sm={6} height="50vh">
      <div
        style={{
          display: 'grid',
          height: '100%',
          gridTemplateRows: 'auto 1fr',
        }}>
        <Typography variant={'h4'}>{title}</Typography>
        <Editor language="json" value={value || ''} onChange={onChange} />
      </div>
    </Grid>
  );
}
