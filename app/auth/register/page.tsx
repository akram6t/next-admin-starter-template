"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

// Define the schema for form validation
const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  storeName: z.string().min(1, "Store name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    storeName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Validate form data
      const validatedData = registerSchema.parse(formData)
      // Make API call
      const response = await axios.post("/api/auth/register", validatedData)
      if (response.data.error) {
        toast({
          title: "Registration failed",
          description: response.data.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Registration successful",
          description: "Redirecting to dashboard...",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        error.errors.forEach((err) => {
          toast({
            title: "Validation Error",
            description: `${err.path.join(".")}: ${err.message}`,
            variant: "destructive",
          })
        })
      } else {
        // Handle other errors
        console.error("Registration error:", error)
        toast({
          title: "Registration failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const renderInput = (field: keyof RegisterFormData) => {
    const isPasswordField = field === 'password' || field === 'confirmPassword'
    const showFieldPassword = field === 'password' ? showPassword : showConfirmPassword

    return (
      <div key={field} className="flex flex-col space-y-1.5">
        <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
        <div className="relative">
          <Input
            id={field}
            name={field}
            type={isPasswordField ? (showFieldPassword ? "text" : "password") : field === "email" ? "email" : "text"}
            value={formData[field]}
            onChange={handleChange}
            required
          />
          {isPasswordField && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => togglePasswordVisibility(field as 'password' | 'confirmPassword')}
            >
              {showFieldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Admin Registration</CardTitle>
          <CardDescription>Set up your eCommerce admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {(Object.keys(formData) as Array<keyof RegisterFormData>).map(renderInput)}
            </div>
            <Button className="w-full mt-4" type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}