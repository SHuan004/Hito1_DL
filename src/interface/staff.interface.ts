export interface Staff {
  id: number;
  username: string;
  password: string;
  role_id: number; // ID del rol asociado (Médico, Enfermero, Administrativo, etc.)
}
