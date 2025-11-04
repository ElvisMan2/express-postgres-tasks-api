import { pool } from '../config/db.js';

// ✅ Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// ✅ Obtener una tarea
export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// ✅ Crear una tarea
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title)
    return res.status(400).json({ error: 'El título es obligatorio' });

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING *`,
      [title, description || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// ✅ Actualizar tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           done = COALESCE($3, done),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, description, done, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Tarea no encontrada' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// ✅ Eliminar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
