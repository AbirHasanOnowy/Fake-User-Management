'use client'
import { Button, Card, List, ListItem, Input } from "@material-tailwind/react"
import { useState } from "react"
const DeleteUser = () => {
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
        } else {
            alert("Invalid User ID")
            setUser(null)
        }
    }


    const DeleteUser = async (e) => {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            alert("Successfully Deleted User")
            setUser(null)
            setUserId("")
            location.reload()
        } else {
            alert("Failed to delete user. Try again")
        }
    }
    return (
        <div>
            {user ? (
                <div className="flex flex-col justify-center items-center">
                    <Card key={user.id} className="w-full mt-5 border px-2">
                        <List className='flex flex-row justify-between'>
                            <ListItem>ID: {user.id}</ListItem>
                            <ListItem>Name: {user.name}</ListItem>
                            <ListItem>Email: {user.email}</ListItem>
                            <ListItem>Age: {user.age}</ListItem>
                        </List>
                    </Card>
                    <div className="flex flex-row justify-around mt-4">
                        <p>Confirm delete {user.name}?</p>
                        <Button onClick={(e) => DeleteUser(e)}
                            className="border-red-600 text-red-600 px-2 ml-10" >Delete</Button>
                    </div>
                </div>
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
    )
}

export default DeleteUser