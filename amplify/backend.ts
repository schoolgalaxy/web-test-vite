import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

// import {
//   BackupPlan,
//   BackupPlanRule,
//   BackupResource,
//   BackupVault,
// } from "aws-cdk-lib/aws-backup";


defineBackend({
  auth,
  data,
});

// const { cfnUserPool, amplifyDynamoDbTables } = backend.auth.resources.cfnResources
// cfnUserPool.deletionProtection = "ACTIVE";
// for (const table of Object.values(amplifyDynamoDbTables)) {
//   table.deletionProtectionEnabled = true;
// }


// const vault = new BackupVault(backupStack, "BackupVault", {
//   backupVaultName: "backup-vault",
// });

// const plan = new BackupPlan(backupStack, "BackupPlan", {
//   backupPlanName: "backup-plan",
//   backupVault: vault,
// });

// plan.addRule(
//   new BackupPlanRule({
//     deleteAfter: Duration.days(60),
//     ruleName: "backup-plan-rule",
//     scheduleExpression: Schedule.cron({
//       minute: "0",
//       hour: "0",
//       day: "*",
//       month: "*",
//       year: "*",
//     }),
//   })
// );

// plan.addSelection("BackupPlanSelection", {
//   resources: myTables.map((table) => BackupResource.fromDynamoDbTable(table)),
//   allowRestores: true,
// });

// // Retain the S3 bucket on stack deletion
// backend.storage.resources.bucket.applyRemovalPolicy(RemovalPolicy.RETAIN);

// // Retain the Cognito user pool on stack deletion
// backend.auth.resources.userPool.applyRemovalPolicy(RemovalPolicy.RETAIN);

// // Retain the DynamoDB table on stack deletion
// backend.data.resources.cfnResources.amplifyDynamoDbTables["Todo"].applyRemovalPolicy(RemovalPolicy.RETAIN);
