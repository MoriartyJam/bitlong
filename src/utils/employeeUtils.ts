
import { Employee } from "@/types";

// Local storage key
const EMPLOYEES_KEY = 'biltong-tracker-employees';

// Helper functions for localStorage
const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error getting data from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

const setLocalData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data in localStorage for key ${key}:`, error);
  }
};

// Employee functions
export const getEmployees = (): Employee[] => {
  return getLocalData<Employee[]>(EMPLOYEES_KEY, []);
};

export const getEmployee = (id: string): Employee | undefined => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id);
};

export const addEmployee = (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Employee => {
  const now = new Date().toISOString();
  const newEmployee: Employee = {
    id: crypto.randomUUID(),
    ...employee,
    createdAt: now,
    updatedAt: now
  };
  
  const employees = getEmployees();
  employees.push(newEmployee);
  setLocalData(EMPLOYEES_KEY, employees);
  
  return newEmployee;
};

export const updateEmployee = (employee: Partial<Employee> & { id: string }): Employee | undefined => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === employee.id);
  
  if (index === -1) return undefined;
  
  const updatedEmployee = {
    ...employees[index],
    ...employee,
    updatedAt: new Date().toISOString()
  };
  
  employees[index] = updatedEmployee;
  setLocalData(EMPLOYEES_KEY, employees);
  
  return updatedEmployee;
};

export const deleteEmployee = (id: string): boolean => {
  const employees = getEmployees();
  const newEmployees = employees.filter(emp => emp.id !== id);
  
  if (employees.length === newEmployees.length) return false;
  
  setLocalData(EMPLOYEES_KEY, newEmployees);
  return true;
};

// Generate a unique employee number
export const generateEmployeeNumber = (): string => {
  const employees = getEmployees();
  const prefix = 'EMP';
  let number = employees.length + 1;
  
  // Make sure the number is unique
  let employeeNumber = `${prefix}${number.toString().padStart(4, '0')}`;
  while (employees.some(emp => emp.employeeNumber === employeeNumber)) {
    number++;
    employeeNumber = `${prefix}${number.toString().padStart(4, '0')}`;
  }
  
  return employeeNumber;
};
