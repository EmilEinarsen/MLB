declare global {
	interface Doc {
		id: string,
		title: string,
		subtitle?: string, 
		text?: string,
		img?: string,
		music?: string,
	}
}

interface FakeData {
	files: Doc[]
}

const fakeData: FakeData = {

	files: [
		{ id: 'h3u89rwr39w3', title: 'A Låt 1', text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`, img: 'fsd/img1', music: 'fsd/music1' },
		{ id: 'a7osn689w3dd', title: 'a Låt 2', text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidigna aliqua.`, img: 'fsd/img2' },
		{ id: '4vn8w934rfr2', title: 'TLåt 3', text: `Lorem ipsum dolor sit amet, conunt ut labore et dolore magna aliqua.`, img: 'fsd/img3', music: 'fsd/music3' },
		{ id: 'hf93hf8309fj', title: '4 eeee', text: `Lorem ipsum dolor sit amet, conunt ut labore et dolore magna aliqua.`, music: 'fsd/music3' },
		{ id: '938dd998939c', title: 'sdnasd5'},
		{ id: '09x2em7tr6cc', title: 'Låt 6', music: 'fsd/music3' },
		{ id: '2n8x61728c4c', title: '_ åt 7', img: 'fsd/img2' },
		{ id: 'mp983hy3veji', title: 'Go, Lovely Rose', subtitle: 'Edmund Waller', text: `
			Go, lovely Rose—
			Tell her that wastes her time and me,
			That now she knows,
			When I resemble her to thee,
			How sweet and fair she seems to be.
		
			Tell her that's young,
			And shuns to have her graces spied,
			That hadst thou sprung
			In deserts where no men abide,
			Thou must have uncommended died.
		
			Small is the worth
			Of beauty from the light retired:
			Bid her come forth,
			Suffer herself to be desired,
			And not blush so to be admired.
		
			Then die—that she
			The common fate of all things rare
			May read in thee;
			How small a part of time they share
			That are so wondrous sweet and fair!
		`, music: 'fsd/music3' },
		{ id: 'n378c7209r307r', title: 'The Law of the Jungle', subtitle: 'Rudyard Kipling', text: `
			Wash daily from nose-tip to tail-tip; drink deeply, but never too deep;

			And remember the night is for hunting, and forget not the day is for sleep.
		
			The Jackal may follow the Tiger, but, Cub, when thy whiskers are grown,
		
			Remember the Wolf is a Hunter - go forth and get food of thine own.
		
			Keep peace with the Lords of the Jungle - the Tiger, the Panther, and Bear.
		
			And trouble not Hathi the Silent, and mock not the Boar in his lair.
		
			When Pack meets with Pack in the Jungle, and neither will go from the trail,
		
			Lie down till the leaders have spoken - it may be fair words shall prevail.
		`, music: 'fsd/music3' },
		{ id: '7n382f238789mf', title: 'I Felt a Funeral in my Brain.', subtitle: 'Emily Dickinson', text: `
			I felt a Funeral, in my Brain,

			And Mourners to and fro
			
			Kept treading - treading - till it seemed
			
			That Sense was breaking through -
			
			And when they all were seated,
			
			A Service, like a
			
			Drum -Kept beating - beating - till I thought
			
			My Mind was going numb -
			
			And then I heard them lift a Box
			
			And creak across my Soul
			
			With those same Boots of Lead, again,
			
			Then Space - began to toll,
			
			As all the Heavens were a Bell,
			
			And Being, but an Ear,
			
			And I, and Silence, some strange
			
			Race Wrecked, solitary, here -
			
			And then a Plank in Reason, broke,
			
			And I dropped down, and down -
			
			And hit a World, at every plunge,
			
			And Finished knowing - then
		`, music: 'fsd/music3' },
	]

}

export default fakeData