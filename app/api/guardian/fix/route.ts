// app/api/guardian/fix/route.ts
import { runGuardianFixer } from '@/utils/GuardianFixer';
import { NextResponse } from 'next/server';

export async function POST() {
  await runGuardianFixer();
  return NextResponse.json({ status: 'success', message: 'All code scanned and fixed' });
}
