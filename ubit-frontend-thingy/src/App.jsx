import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeSection from './components/HomeSection'
import PostSection from './components/PostSection'
import SiteHeader from './components/SiteHeader'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<SiteHeader />
				<Routes>
					<Route path='/' element={<HomeSection />} />
					<Route path='/post/:postId' element={<PostSection />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
