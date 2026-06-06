import { ApplicationLayout } from '@/app/(pages)/application-layout'
import Header from '@/components/header/header'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ApplicationLayout >
      {children}
    </ApplicationLayout>
  )
}
