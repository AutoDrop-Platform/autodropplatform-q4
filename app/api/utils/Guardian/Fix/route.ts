'use server';

import { runGuardianFixer } from '@/utils/GuardianFixer';

export async function fixMyCode() {
  await runGuardianFixer();
}
