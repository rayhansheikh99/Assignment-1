export function multiplyValue(value: number, multiplier: number = 2): number {
  return value * multiplier;
}

export function processInput(value: string | number | boolean): string | number {
  if (typeof value === "string") return value.trim().toLowerCase();
  if (typeof value === "number") return value * 10;
  return value ? "Active" : "Inactive";
}

export function formatCoordinate(coordinate: readonly [number, number, string]): string {
  const [latitude, longitude, locationName] = coordinate;
  return `Location: ${locationName} (${latitude}, ${longitude})`;
}

export function concatenateArrays<T>(...arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays);
}

export interface Course {
  title: string;
  students: number;
  isPublished: boolean;
}

export function getPopularCourses(courses: Course[], minStudents: number): Course[] {
  return courses.filter((course: Course): boolean => course.isPublished && course.students >= minStudents);
}

export function pluckValues<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item: T): T[K] => item[key]);
}

export class Employee {
  constructor(protected name: string, private baseSalary: number) {}

  getDetails(): string {
    return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`;
  }
}

export class Manager extends Employee {
  constructor(name: string, baseSalary: number, private department: string) {
    super(name, baseSalary);
  }

  getRoleInfo(): string {
    return `Manager of ${this.department}: ${this.name}`;
  }
}

export async function validateAgeAsync(age: number): Promise<string> {
  if (age < 18) throw new Error("Access Denied: Must be 18 or older");

  return new Promise<string>((resolve): void => {
    setTimeout((): void => resolve("Access Granted"), 1000);
  });
}
