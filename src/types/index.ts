export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: number; // 하루에 몇 번
  times: string[]; // ['08:00', '14:00', '20:00']
  startDate: Date;
  endDate?: Date;
  notes?: string;
  color: string;
  userId: string;
  familyId?: string;
}

export interface MedicineIntake {
  id: string;
  medicineId: string;
  scheduledTime: Date;
  takenTime?: Date;
  status: 'pending' | 'taken' | 'missed' | 'skipped';
  notes?: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  familyId?: string;
  role: 'admin' | 'member';
  createdAt: Date;
}

export interface Family {
  id: string;
  name: string;
  adminId: string;
  members: string[]; // user IDs
  inviteCode: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'medicine_reminder' | 'family_alert' | 'missed_medicine';
  title: string;
  body: string;
  data?: any;
  userId: string;
  read: boolean;
  createdAt: Date;
}
