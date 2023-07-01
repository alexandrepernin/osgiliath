-- DropForeignKey
ALTER TABLE "UserMembership" DROP CONSTRAINT "UserMembership_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserMembership" DROP CONSTRAINT "UserMembership_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
