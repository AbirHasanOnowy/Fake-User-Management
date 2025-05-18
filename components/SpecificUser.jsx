'use client'
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react"
import { useState } from "react"
const SpecificUser = () => {
    const [userId, setUserId] = useState("")
    const [user, setUser] = useState(null)

    const fetchUserData = async () => {
        const response = await fetch(`/api/users/${userId}`)
        if (response.ok) {
            const userData = await response.json()
            setUser(userData)
        } else {
            setUser(null)
            window.alert("Invalid User ID")
        }
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full flex flex-row justify-center">
                    <Input
                        label="Enter User ID"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="mt-2 border text-amber-50 w-116 text-center"

                    />
                    <Button onClick={fetchUserData} className="border ml-2 mt-2 w-40 block">
                        Fetch User
                    </Button>
                    <br />
                </div>
                {user ? (
                    user.id != null ? (
                        <>
                            <Card key={user.id} className="w-full mt-5 border-0">
                                <List className='flex flex-row justify-between'>
                                    <ListItem>ID: {user.id}</ListItem>
                                    <ListItem>Name: {user.name}</ListItem>
                                    <ListItem>Email: {user.email}</ListItem>
                                    <ListItem>Age: {user.age}</ListItem>
                                </List>
                            </Card>
                        </>
                    ) : (
                        <p className="mt-6 block w-full">User not found</p>
                    )

                ) : (
                    <p className="mt-6 block w-full">Search for a specific/valid user</p>
                )}
            </div>
        </div>
    )
}


export default SpecificUser;