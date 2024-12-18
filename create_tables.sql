-- Crear la tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Crear la tabla notes
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  archived BOOLEAN DEFAULT false,
  categories TEXT[] -- Un array de categorías
);

-- Insertar datos iniciales en categories
INSERT INTO categories (name) VALUES 
  ('Trabajo'),
  ('Personal'),
  ('Urgente')
ON CONFLICT (name) DO NOTHING;

-- Insertar 10 notas en la tabla notes
INSERT INTO notes (title, content, archived, categories) 
VALUES 
  ('Nota 1', 'Contenido de la nota 1', false, ARRAY['Trabajo', 'Urgente']),
  ('Nota 2', 'Contenido de la nota 2', true, ARRAY['Personal']),
  ('Nota 3', 'Contenido de la nota 3', false, ARRAY['Trabajo']),
  ('Nota 4', 'Contenido de la nota 4', false, ARRAY['Urgente']),
  ('Nota 5', 'Contenido de la nota 5', false, ARRAY['Trabajo', 'Personal']),
  ('Nota 6', 'Contenido de la nota 6', false, ARRAY['Trabajo']),
  ('Nota 7', 'Contenido de la nota 7', false, ARRAY['Urgente']),
  ('Nota 8', 'Contenido de la nota 8', false, ARRAY['Personal']),
  ('Nota 9', 'Contenido de la nota 9', true, ARRAY['Trabajo']),
  ('Nota 10', 'Contenido de la nota 10', false, ARRAY['Trabajo', 'Urgente']);
