import { Request, Response } from 'express';
import { StaffService } from '../services/staff.service';

/**
 * Obtiene todos los miembros del staff.
 */
const getStaff = async (req: Request, res: Response) => {
  try {
    const staffList = await StaffService.getAllStaff();
    res.json({ staff: staffList });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
};

/**
 * Obtiene un miembro del staff por ID.
 */
const getStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const staff = await StaffService.getStaffById(Number(id));

    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    res.json({ staff });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
};

/**
 * Crea un nuevo miembro del staff.
 */
const createStaff = async (req: Request, res: Response) => {
  try {
    const { username, password, role_id } = req.body;

    if (!role_id) {
      return res.status(400).json({ error: 'Role ID is required' });
    }

    const newStaff = await StaffService.createStaffWithUsernameAndPassword(
      username,
      password,
      Number(role_id)
    );

    res.status(201).json({ staff: newStaff });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
};

/**
 * Elimina un miembro del staff por ID.
 */
const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await StaffService.deleteStaffById(Number(id));

    if (!deleted) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error de servidor' });
    }
  }
};

export const staffController = {
  getStaff,
  getStaffById,
  createStaff,
  deleteStaff,
};
