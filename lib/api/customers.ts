import apiClient, { PaginatedResponse } from './client';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active Customer" | "Lead" | "Churned" | "Prospect";
  ltv: number;
  dealsCount: number;
  lastContacted: string;
  avatarBg: string;
}

// Example mock data for the theme
const mockCustomers: Customer[] = [
  { id: "c1", name: "Sarah Jenkins", email: "sarah.j@acmecorp.com", company: "Acme Corp", status: "Active Customer", ltv: 145000, dealsCount: 4, lastContacted: "Today, 10:45 AM", avatarBg: "bg-violet-600" },
  { id: "c2", name: "David Miller", email: "d.miller@nexusai.io", company: "Nexus AI Inc", status: "Lead", ltv: 28500, dealsCount: 1, lastContacted: "Yesterday", avatarBg: "bg-indigo-600" },
  { id: "c3", name: "Elena Rostova", email: "elena@starlight.media", company: "Starlight Media", status: "Active Customer", ltv: 89000, dealsCount: 3, lastContacted: "Aug 08, 2026", avatarBg: "bg-rose-600" },
  { id: "c4", name: "James Thorne", email: "j.thorne@vanguardtech.com", company: "Vanguard Tech", status: "Prospect", ltv: 18000, dealsCount: 2, lastContacted: "Aug 06, 2026", avatarBg: "bg-blue-600" },
  { id: "c5", name: "Marcus Aurelius", email: "marcus@imperium.io", company: "Imperium Global", status: "Active Customer", ltv: 210000, dealsCount: 6, lastContacted: "Aug 04, 2026", avatarBg: "bg-emerald-600" },
  { id: "c6", name: "Chloe Bennett", email: "chloe@apexdesign.co", company: "Apex Design Co", status: "Churned", ltv: 12000, dealsCount: 1, lastContacted: "Jul 22, 2026", avatarBg: "bg-amber-600" },
];

export interface GetCustomersParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export const customersApi = {
  // GET: Fetch paginated list
  getCustomers: async (params: GetCustomersParams): Promise<PaginatedResponse<Customer>> => {
    // NOTE: This uses a mock implementation so the theme works without a backend.
    // Buyers should replace this with a real API call:
    // const { data } = await apiClient.get('/customers', { params });
    // return data;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockCustomers];
        
        if (params.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(q) || 
            c.company.toLowerCase().includes(q) || 
            c.email.toLowerCase().includes(q)
          );
        }
        
        if (params.status) {
          filtered = filtered.filter(c => c.status === params.status);
        }

        const total = filtered.length;
        const totalPages = Math.ceil(total / params.limit);
        const start = (params.page - 1) * params.limit;
        const data = filtered.slice(start, start + params.limit);

        resolve({
          data,
          meta: {
            pagination: {
              page: params.page,
              page_size: params.limit,
              total,
              totalPages: totalPages === 0 ? 1 : totalPages,
            }
          }
        });
      }, 600); // simulate network delay
    });
  },

  // GET: Fetch single record
  getCustomerById: async (id: string): Promise<Customer> => {
    // const { data } = await apiClient.get(`/customers/${id}`);
    // return data.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = mockCustomers.find(c => c.id === id);
        if (found) resolve(found);
        else reject(new Error('Not found'));
      }, 400);
    });
  },

  // POST: Create
  createCustomer: async (customer: Partial<Customer>): Promise<Customer> => {
    // const { data } = await apiClient.post('/customers', customer);
    // return data.data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCust = { ...customer, id: `c${Date.now()}` } as Customer;
        mockCustomers.unshift(newCust);
        resolve(newCust);
      }, 500);
    });
  },

  // PUT: Update
  updateCustomer: async ({ id, data }: { id: string; data: Partial<Customer> }): Promise<Customer> => {
    // const { data: resData } = await apiClient.put(`/customers/${id}`, data);
    // return resData.data;
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id, ...data } as Customer), 500);
    });
  },

  // DELETE
  deleteCustomer: async (id: string): Promise<void> => {
    // await apiClient.delete(`/customers/${id}`);
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};
