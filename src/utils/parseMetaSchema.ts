import type { Variable, IFieldMeta } from '../types';

export function parseMetaSchema(
  schema: IFieldMeta,
  path: string = '',
  refPath?: string,
): Variable {
  const children: Variable[] = [];
  if (schema?.type === 'object') {
    if (schema?.properties !== null) {
      const { properties = {} } = schema;
      Object.keys(properties).forEach((key) => {
        const fieldSchema = properties?.[key];
        const fieldPath = `${path ? `${path}.` : ''}${key}`;
        if (refPath !== fieldPath) {
          children.push(parseMetaSchema(fieldSchema, fieldPath, refPath));
        }
      });
    }
  } else if (schema?.type === 'array') {
    const { properties } = schema;
    if (properties) {
      children.push(
        ...Object.keys(properties)
          .filter((key) =>
            `${path ? `${path}.` : ''}${key}` !== refPath)
          .map((key) => {
            const fieldSchema = properties[key];
            const fieldPath = `${path ? `${path}.` : ''}${key}`;
            return parseMetaSchema(fieldSchema, fieldPath, refPath);
          }),
      );
    }
  } else if (path !== refPath) {
    children.push({
      label: schema.name,
      value: path,
      type: schema.type || '',
    });
  }
  if (schema?.type === 'object' || schema?.type === 'array') {
    return {
      label: schema.name,
      value: path,
      type: schema.type?.toString(),
      children,
    };
  }
  return {
    label: schema.name,
    value: path,
    type: schema.type || '',
  };
}

export interface CleanMetaSchemaResult {
  key?: string;
  schema?: IFieldMeta;
}

function mapProperties(results: CleanMetaSchemaResult[]) {
  const properties: Record<string, IFieldMeta> = {};
  results.forEach((r) => {
    if (r.key && r.schema) {
      properties[r.key] = r.schema;
    }
  });
  return properties;
}

export function cleanVoidMetaSchema(
  schema: IFieldMeta,
  key?: string,
): CleanMetaSchemaResult | CleanMetaSchemaResult[] | undefined {
  const { properties } = schema;
  if (schema.type === 'object') {
    if (typeof properties === 'object') {
      const cleanProperties: CleanMetaSchemaResult[] = [];
      Object.keys(properties).forEach((propertyKey) => {
        const result = cleanVoidMetaSchema(properties[propertyKey], propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
      return {
        schema: { ...schema, properties: mapProperties(cleanProperties) },
        key,
      };
    }
    return { schema, key };
  }
  if (schema.type === 'array') {
    const { ...other } = schema;
    const cleanProperties: CleanMetaSchemaResult[] = [];
    if (properties) {
      Object.keys(properties).forEach((propertyKey) => {
        const result = cleanVoidMetaSchema(properties[propertyKey] as IFieldMeta, propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
    }
    const newProerites = properties
      ? mapProperties(cleanProperties)
      : undefined;
    return {
      schema: {
        ...other,
        properties: newProerites,
      },
      key,
    };
  }
  if (schema.type === 'void') {
    const cleanProperties: CleanMetaSchemaResult[] = [];
    if (properties) {
      Object.keys(properties).forEach((propertyKey) => {
        const result = cleanVoidMetaSchema(properties[propertyKey] as IFieldMeta, propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
    }
    return cleanProperties;
  }
  return { schema, key };
}
