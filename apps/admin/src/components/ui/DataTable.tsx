'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipWrapper } from './Tooltip';
import { Skeleton } from './Skeleton';

interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch?: (search: string) => void;
  searchPlaceholder?: string;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  onReload?: () => void;
  isReloading?: boolean;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onSearch,
  searchPlaceholder = 'Search...',
  isLoading,
  onRowClick,
  onReload,
  isReloading = false,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(total / limit);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const timeoutId = setTimeout(() => {
      onSearch?.(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="space-y-4">
      {/* Search & Reload Action Bar */}
      {(onSearch || onReload) && (
        <div className="flex items-center justify-between gap-4 w-full">
          {onSearch ? (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          ) : (
            <div />
          )}

          {onReload && (
            <TooltipWrapper content="Reload Data">
              <Button
                variant="outline"
                size="icon"
                onClick={onReload}
                disabled={isLoading || isReloading}
                className="h-10 w-10 flex items-center justify-center border hover:bg-accent"
              >
                <RefreshCw
                  className={cn(
                    'h-4 w-4 text-muted-foreground',
                    isReloading && 'animate-spin text-primary'
                  )}
                />
              </Button>
            </TooltipWrapper>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)} className={cn(column.className)}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: limit || 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-transparent">
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={cn(column.className)}>
                      <Skeleton className="h-5 w-3/4 my-1" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn(onRowClick && 'cursor-pointer hover:bg-muted/50')}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={cn(column.className)}>
                      {column.cell
                        ? column.cell(item, index)
                        : String(item[column.key as keyof T] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Rows per page:
          </span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto sm:justify-end">
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages} ({total} total)
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}