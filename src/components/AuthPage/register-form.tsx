import { useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"
import { register } from "../../api/auth"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")


     const validatePasswords = (currentPassword: string, currentConfirmPassword: string) => {
        if(currentConfirmPassword && currentPassword !== currentConfirmPassword) {
            setError("Passwords do not match")
            return false
        }

        if(error === "Passwords do not match") {
            setError("")
        }

        return true
    }


    const handleRegister = async () => {
        if(!validatePasswords(password, confirmPassword)) {
            return
        }

        try {
            const data = await register(email, name, password)

            setError("")

            localStorage.setItem('token', data.access_token)
            console.log('account created')


            navigate('/dashboard')
        } catch (err: any) {
            const message = err?.response?.data?.message

            console.error(message)
            setError(message || "Something went wrong. Please try again.")
        }
    } 


    return (
        <form className={cn("flex flex-col gap-6 md:w-100", className)} {...props}
        onSubmit={(e) => {
            e.preventDefault()
            handleRegister()
        }}>
            <FieldGroup>
                <div className="flex flex-col items-baseline text-center">
                    <h1 className="text-2xl font-bold">Create Your Account</h1>
                     <p className="text-sm text-balance text-muted-foreground">
                        Create your account to access Higoskayan
                    </p>
                </div>
                   <Field>
                    <FieldLabel htmlFor="email">Name</FieldLabel>
                    <Input id="name" type="name" placeholder="Enter your name" required className="h-10" value={name} onChange={(e) => setName(e.target.value)}/>
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="m@example.com" required className="h-10" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Field>
                <Field>
                    <div className="flex items-center">
                       <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input id="password" type="password" required className="h-10" value={password}
                    onChange={(e) => {
                    const value = e.target.value 
                    setPassword(value) 
                    validatePasswords(value, confirmPassword)}} 
                    placeholder="**********"/>
                </Field>
                 <Field>
                    <div className="flex items-center">
                       <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                    </div>
                    <Input id="confirmPassword" type="password" required className="h-10"  value={confirmPassword}
                    onChange={(e) => {
                        const value = e.target.value
                        setConfirmPassword(value)
                        validatePasswords(password, value)
                    }} 
                    placeholder="**********"/>
                    {error && <span className="text-xs text-red-800 ">{error}</span>}
                </Field>
                <Field>
                    <Button type="submit" className="h-10 bg-green text-xs">Create Account</Button>
                </Field>
                <Field>
                     <FieldSeparator className="text-xs">Or continue with</FieldSeparator>
                  <Button variant="outline" type="button" className="h-10 gap-2 mt-3 mb-2 text-xs">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                 Login with Google
                </Button>
                <FieldDescription className="text-center text-xs">
                    Already have account?{" "}
                    <a onClick={() => navigate('/')} className="underline underline-offset-4">
                    Sign up
                    </a>
                </FieldDescription>
                </Field>
            </FieldGroup>
            
        </form>
    )
}