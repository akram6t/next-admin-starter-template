"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const categories = [
  { id: 1, name: 'Electronics', productCount: 150, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 2, name: 'Clothing', productCount: 320, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 3, name: 'Books', productCount: 80, image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 4, name: 'Home & Garden', productCount: 210, image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=300&h=300' },
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCreate = (formData) => {
    console.log("Create category:", formData)
    // Implement create logic here
  }

  const handleEdit = (formData) => {
    console.log("Edit category:", formData)
    // Implement edit logic here
  }

  const handleDelete = (id) => {
    console.log("Delete category:", id)
    // Implement delete logic here
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Enter the details for the new category.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleCreate(Object.fromEntries(formData))
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input id="image" name="image" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-muted-foreground mb-4">{category.productCount} products</p>
              <div className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setSelectedCategory(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                      <DialogDescription>
                        Make changes to the category here.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      handleEdit(Object.fromEntries(formData))
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">
                            Name
                          </Label>
                          <Input id="edit-name" name="name" defaultValue={selectedCategory?.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-image" className="text-right">
                            Image URL
                          </Label>
                          <Input id="edit-image" name="image" defaultValue={selectedCategory?.image} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Category</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this category? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => handleDelete(category.id)}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}