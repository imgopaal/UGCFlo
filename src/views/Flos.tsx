import { Flo } from '@/@types/flos'
import { Input, Pagination, Select, Table } from '@/components/ui'
import { mockFlos } from '@/mock/data/flosData'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

interface DebouncedInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
}

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) {
	const [value, setValue] = useState(initialValue)

	React.useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, debounce, onChange])

	return (
		<div className="flex items-center mb-4">
			<Input {...props} value={value} onChange={e => setValue(e.target.value)} className="max-w-sm bg-white" />
		</div>
	)
}

const fuzzyFilter: any = (row: any, columnId: string, value: string, addMeta: any) => {
	const itemRank = rankItem(row.getValue(columnId), value)
	addMeta({ itemRank })
	return itemRank.passed
}

const FlosList = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [globalFilter, setGlobalFilter] = useState('')

	const columns = useMemo<ColumnDef<Flo>[]>(
		() => [
			{
				header: 'Name',
				accessorKey: 'name',
				cell: ({ row }) => (
					<div className="flex items-center">
						<img
							src={row.original.image}
							alt={row.original.name}
							className="w-10 h-10 rounded-lg object-cover mr-3"
						/>
						<div>
							<div className="font-medium text-gray-900">{row.original.name}</div>
							<div className="text-sm text-gray-500">{row.original.description}</div>
						</div>
					</div>
				),
			},
			{
				header: 'Status',
				accessorKey: 'status',
				cell: ({ row }) => {
					const statusColors =
						row.original.status === 'Active'
							? 'bg-green-100 text-green-800'
							: row.original.status === 'Draft'
								? 'bg-orange-200 text-orange-900'
								: 'bg-blue-200 text-blue-900'
					return (
						<span
							className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors}`}
						>
							{row.original.status}
						</span>
					)
				},
			},
			{
				header: 'Budget',
				accessorKey: 'budget',
			},
			{
				header: 'Applicants',
				accessorKey: 'applicants',
			},
			{
				header: 'Approved / Total',
				accessorKey: 'approved',
				cell: ({ row }) => (
					<span>
						{row.original.approved} / {row.original.total}
					</span>
				),
			},
			{
				header: 'Deadline',
				accessorKey: 'deadline',
			},
		],
		[]
	)

	const table = useReactTable({
		data: mockFlos,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			columnFilters,
			globalFilter,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
	})

	const onPaginationChange = (page: number) => {
		table.setPageIndex(page - 1)
	}

	const onSelectChange = (value = 0) => {
		table.setPageSize(Number(value))
	}
	
	type Option = {
		value: number
		label: string
	}

	const totalData = mockFlos.length

	const pageSizeOption = [
		{ value: 10, label: '10 / page' },
		{ value: 20, label: '20 / page' },
		{ value: 30, label: '30 / page' },
		{ value: 40, label: '40 / page' },
		{ value: 50, label: '50 / page' },
	]

	return (
		<div>
			<div className="flex justify-between items-center mb-2">
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={value => setGlobalFilter(String(value))}
					placeholder="Search all columns..."
				/>{' '}
				<Link
					to="/create"
					className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					<BiPlus className="w-5 h-5 mr-2" />
					Create Flo
				</Link>
			</div>

			<div className="bg-white rounded-lg shadow">
				<Table>
					<THead>
						{table.getHeaderGroups().map(headerGroup => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<Th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div
												className={
													header.column.getCanSort() ? 'cursor-pointer select-none' : ''
												}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												<Sorter sort={header.column.getIsSorted()} />
											</div>
										)}
									</Th>
								))}
							</Tr>
						))}
					</THead>
					<TBody>
						{table.getRowModel().rows.map(row => (
							<Tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
								))}
							</Tr>
						))}
					</TBody>
				</Table>
				<div className="flex items-center justify-between mt-4">
					<Pagination
						pageSize={table.getState().pagination.pageSize}
						currentPage={table.getState().pagination.pageIndex + 1}
						total={totalData}
						onChange={onPaginationChange}
					/>
					<div style={{ minWidth: 130 }}>
						<Select<Option>
							size="sm"
							isSearchable={false}
							value={pageSizeOption.filter(
								option => option.value === table.getState().pagination.pageSize
							)}
							options={pageSizeOption}
							onChange={option => onSelectChange(option?.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FlosList
