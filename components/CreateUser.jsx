'use client'
import { Button, Card, Input } from "@material-tailwind/react"
import { useState } from "react"


const CreateUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const createUser = async (e) => {
        e.preventDefault()
        if (!name || !email || !age || !password) {
            alert("Please fill all fields")
            return
        }
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age, password })
        })

        if (response.ok) {
            const userData = await response.json()
            setUser(userData)
        } else {
            setUser(null)
        }
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {/* <div className="w-full flex flex-col justify-center">
                    <Input
                        label="Enter Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center "
                    />
                    <Input
                        label="Enter Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"

                    />
                    <Input
                        label="Enter Age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"

                    />
                    <Input
                        label="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"

                    />
                    <Button onClick={createUser} className="border ml-2 mt-2 w-40 block">
                        Create User
                    </Button>
                    <br />
                </div> */}
                <form action="">
                    <input
                        placeholder="Enter Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center "
                    />
                    <input
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"
                    />
                    <input
                        placeholder="Enter Age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"
                    />
                    <input
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 border text-amber-50 w-160 text-center"
                    />
                    <Button onClick={e => createUser(e)} className="border ml-60 mt-2 w-40 align-center">
                        Create User
                    </Button>
                    <br />
                </form>
                {user ? (
                    user.id != null ? (
                        <>
                            <Card key={user.id} className="w-full mt-5 border-0">
                                <p>User Created Successfully</p>
                            </Card>
                        </>
                    ) : (
                        <p className="mt-6 block w-full">User not created</p>
                    )

                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default CreateUser