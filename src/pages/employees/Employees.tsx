
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Employee } from "@/types";
import { getEmployees, deleteEmployee } from "@/utils/employeeUtils";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const handleDeleteEmployee = (id: string) => {
    const success = deleteEmployee(id);
    
    if (success) {
      setEmployees(employees.filter(emp => emp.id !== id));
      toast.success(t('employees.deleteSuccess'));
    } else {
      toast.error(t('employees.deleteError'));
    }
    
    setEmployeeToDelete(null);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('employees.title')}</h1>
        <Link to="/employees/add">
          <Button className="rounded-full" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      {employees.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground text-lg">{t('employees.noEmployees')}</p>
          <Link to="/employees/add" className="mt-4 inline-block">
            <Button>{t('employees.add')}</Button>
          </Link>
        </div>
      ) : isMobile ? (
        // Mobile card view
        <div className="grid gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.employeeNumber}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/employees/edit/${employee.id}`}>
                          <Pencil className="h-4 w-4 mr-2" /> {t('app.edit')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => setEmployeeToDelete(employee.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> {t('app.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-1 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('employees.email')}:</span> {employee.email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('employees.mobile')}:</span> {employee.mobile}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop table view
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('employees.employeeNumber')}</TableHead>
                <TableHead>{t('employees.name')}</TableHead>
                <TableHead>{t('employees.email')}</TableHead>
                <TableHead>{t('employees.mobile')}</TableHead>
                <TableHead className="text-right">{t('employees.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeNumber}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.mobile}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/employees/edit/${employee.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEmployeeToDelete(employee.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Link to="/employees/add">
        <Button
          className="rounded-full w-14 h-14 fixed bottom-6 right-6 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>

      <AlertDialog open={!!employeeToDelete} onOpenChange={(open) => {
        if (!open) setEmployeeToDelete(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('employees.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('employees.deleteConfirmation')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('app.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => employeeToDelete && handleDeleteEmployee(employeeToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('app.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
