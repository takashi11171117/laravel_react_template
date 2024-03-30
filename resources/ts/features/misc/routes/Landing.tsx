import { useNavigate } from 'react-router'

export const Landing = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-white h-[100vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="mt-8 flex justify-center">This is Landing page.</div>
        </div>
      </div>
    </>
  )
}
