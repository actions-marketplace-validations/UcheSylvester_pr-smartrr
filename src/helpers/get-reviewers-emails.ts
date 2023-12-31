import { exec } from 'child_process';
import { formatReviewers } from '../utils';

export const getReviewersEmails = async (changedFiles: string) => {
  return new Promise<string[]>((resolve, reject) => {
    exec(
      `git log --pretty=format:"%ae" -- ${changedFiles} | sort -u`,
      (error, stdout) => {
        if (stdout) {
          resolve(formatReviewers(stdout));
        } else {
          reject(new Error(error?.message));
        }
      }
    );
  });
};
