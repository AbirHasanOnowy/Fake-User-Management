'use client'
import { Button, Card, Input } from "@material-tailwind/react"
import { useState } from "react"

const UpdateUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState("")

    const fetchUser = async (e) => {
        e.preventDefault()
        if (!userId) {
            alert("Please enter a user ID")
            return
        }
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET'
        })
        if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            setName(userData.name)
            setEmail(userData.email)
            setPassword(userData.password)
            setAge(userData.age)
        } else {
            alert("Invalid User ID")
            setUser(null)
        }
    }


    const UpdateUser = async (e) => {
        e.preventDefault()
        if (!name || !email || !age || !password) {
            alert("Please fill all fields")
            return
        }
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age, password })
        })

        if (response.ok) {
            alert("Successfully Updated User")
            clearForm()
            location.reload()
        } else {
            alert("Failed to update user. Try again")
        }
    }

    const clearForm = () => {
        setName("")
        setEmail("")
        setAge("")
        setPassword("")
        setUserId("")
        setUser(null)
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {user ? (

                    <form action="" method="PUT">
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
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 border text-amber-50 w-160 text-center"
                        />
                        <Button onClick={e => UpdateUser(e)} className="border ml-60 mt-2 w-40 align-center">
                            Update User
                        </Button>
                        <br />
                    </form>

                ) : (
                    <div className="w-full flex flex-row justify-center">
                        <Input
                            label="Enter User ID"
                            type="text"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="mt-2 border text-amber-50 w-116 text-center "
                        />
                        <Button onClick={e => fetchUser(e)} className="border ml-2 mt-2 w-40 align-center">
                            Get User
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpdateUser