import { Link } from 'react-router-dom'
import { projects } from '../../data/mockData'
import Button from '../../components/Button'
import Badge from '../../components/Badge'

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-600">Add, edit, or remove marketplace listings.</p>
        </div>
        <Button>Add product</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium lg:px-6">Project</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right lg:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-4 lg:px-6">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-1">{p.title}</p>
                        <p className="text-xs text-slate-500">ID {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 capitalize text-slate-600">{p.category}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">${p.price}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.bestSeller && <Badge tone="warning">Best seller</Badge>}
                      {p.isNew && <Badge tone="success">New</Badge>}
                      {!p.bestSeller && !p.isNew && <Badge>Active</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right lg:px-6">
                    <div className="flex justify-end gap-2">
                      <Button as={Link} to={`/product/${p.id}`} variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
