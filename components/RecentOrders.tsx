import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentOrders = [
  { id: '1', product: 'iPhone 13 Pro', customer: 'John Doe', total: '$999', status: 'Completed' },
  { id: '2', product: 'MacBook Air', customer: 'Jane Smith', total: '$1299', status: 'Processing' },
  { id: '3', product: 'AirPods Pro', customer: 'Bob Johnson', total: '$249', status: 'Shipped' },
  { id: '4', product: 'iPad Mini', customer: 'Alice Brown', total: '$499', status: 'Pending' },
  { id: '5', product: 'Apple Watch Series 7', customer: 'Charlie Wilson', total: '$399', status: 'Completed' },
]

export function RecentOrders() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}