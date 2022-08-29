import Room from './Room';
import roomData from './examples/rooms.terrain';

export default (roomData as { terrain: string }[]).map(room =>
	new Room(room.terrain).buildSVG(
		false, // Grid overlay
		true, // Draw swamp
		true, // Draw terrain
		true  // Include background
	)
)