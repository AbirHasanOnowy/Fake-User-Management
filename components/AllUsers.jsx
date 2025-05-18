'use client'
import { List, ListItem, Card } from "@material-tailwind/react"
import { useState, useEffect } from "react"

const AllUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users')
                const usersInfo = await response.json()
                setUsers(usersInfo)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }

        fetchUsers()
    }, [])
    return (
        <div className="w-full">
            {users && users.map((user) => (
                <Card key={user.id} className="mb-4 border-0">
                    <List className="flex flex-row justify-between border-0">
                        <ListItem>{user.id}</ListItem>
                        <ListItem>{user.name}</ListItem>
                        <ListItem>{user.email}</ListItem>
                        <ListItem>{user.age}</ListItem>
                    </List>
                </Card>
            ))}
        </div>
    )
}

export default AllUsers