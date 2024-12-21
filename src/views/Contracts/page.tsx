import React, { useMemo, useState, useEffect } from 'react'
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
import { Input, Button, Pagination, Table, Select } from '@/components/ui'
import mockPDF from '../../../public/data/mock-contract.pdf'
import { mockContracts } from '@/mock/data/flosData'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

interface DebouncedInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
}

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	useEffect(() => {
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

const NewContracts = () => {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [globalFilter, setGlobalFilter] = useState('')

	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				header: 'Contract Name',
				accessorKey: 'contractName',
				cell: ({ row }) => <span>{row.original.contractName}</span>,
			},
			{
				header: 'Duration',
				accessorKey: 'duration',
			},
			{
				header: 'Creator',
				accessorKey: 'creator',
			},
			{
				header: 'Created Date',
				accessorKey: 'createdDate',
			},
			{
				header: 'Actions',
				accessorKey: 'actions',
				enableSorting: false,
				cell: ({ row }) => (
					<div className="flex space-x-2">
						<Button
							className="bg-green-600 hover:bg-green-700 min-w-24"
							variant='solid'
							size="sm"
							onClick={() => handleRenew(row.original.id)}
						>
							Renew
						</Button>
						<Button
							className="bg-blue-500 hover:bg-blue-600 min-w-24"
							variant='solid'
							size="sm"
							onClick={e => {
								e.preventDefault()
								window.open(mockPDF, '_blank')
							}}
						>
							Download
						</Button>
						<Button
							className="bg-red-500 hover:bg-red-600 min-w-24"
							size="sm"
							variant="solid"
							onClick={() => handleDelete(row.original.id)}
						>
							Delete
						</Button>
					</div>
				),
			},
		],
		[]
	)

	const table = useReactTable({
		data: mockContracts,
		columns,
		filterFns: {
			fuzzy: (row, columnId, value, addMeta) => {
				const itemRank = rankItem(row.getValue(columnId), value)
				addMeta({ itemRank })
				return itemRank.passed
			},
		},
		state: {
			columnFilters,
			globalFilter,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, columnId, value) => row.original[columnId].toLowerCase().includes(value.toLowerCase()),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
	})

	const handleRenew = (id: string) => {
		console.log('Renew contract with ID:', id)
	}

	const handleDownload = (e: any) => {
		// console.log('Download contract with ID:', id)
		e.preventDefault()
		window.open(mockPDF, '_blank')
	}

	const handleDelete = (id: string) => {
		console.log('Delete contract with ID:', id)
	}

	const totalData = mockContracts.length

	const pageSizeOptions = [
		{ value: 10, label: '10 / page' },
		{ value: 20, label: '20 / page' },
		{ value: 30, label: '30 / page' },
		{ value: 40, label: '40 / page' },
		{ value: 50, label: '50 / page' },
	]

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={value => setGlobalFilter(String(value))}
					placeholder="Search contracts..."
				/>
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
						onChange={page => table.setPageIndex(page - 1)}
					/>
					<div style={{ minWidth: 130 }}>
						<Select
							size="sm"
							isSearchable={false}
							value={pageSizeOptions.find(
								option => option.value === table.getState().pagination.pageSize
							)}
							options={pageSizeOptions}
							onChange={option => table.setPageSize(option?.value || 10)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewContracts
