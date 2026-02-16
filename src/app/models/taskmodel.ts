export interface TaskModel {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  completed: boolean;
}
