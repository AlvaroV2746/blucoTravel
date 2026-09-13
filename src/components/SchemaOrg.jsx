import { Helmet } from 'react-helmet-async';

const SchemaOrg = ({ schema }) => {
  if (!schema) return null;
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <Helmet>
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default SchemaOrg;