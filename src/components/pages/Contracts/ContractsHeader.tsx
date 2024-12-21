import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import { Plus } from 'lucide-react'

export function ContractsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contracts</h1>
        <p className="text-sm text-muted-foreground">
          Manage your usage rights contracts and licenses
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search contracts..."
          className="w-[300px]"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Contract
        </Button>
      </div>
    </div>
  )
}

