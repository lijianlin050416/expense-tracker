'use server'
import db from "@/app/sql.mjs"
import { listItem } from '@/app/expenseTracker'

export async function GET() {
  return new Response('hello removeItem')
}

export async function POST(request: Request) {
  try {
    const item: listItem = await request.json() as listItem
    db.prepare("DELETE FROM expense_items WHERE id = ?").run(item.id);
    return new Response('ok', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    // 在这里可以处理 body 数据
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}