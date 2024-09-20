"use client";
import scss from "./SearchResults.module.scss";
import { useParams } from "next/navigation";
import { useSearchTracksQuery } from "@/redux/api/search";
import { usePlayerStore } from "@/stores/usePlayerStore";

const SearchResults = () => {
	const { searchQuery } = useParams();
	const decodeText = decodeURIComponent(String(searchQuery));
	const { data, isLoading } = useSearchTracksQuery(decodeText);
	const { setTrackUris, setTrackIndex, activeUri, setActiveUri } =
		usePlayerStore();

	const getTrackUris = async (index: number) => {
		const tracksUrisFilter = data?.tracks.items.map((item) => item.uri);
		setTrackUris(tracksUrisFilter!);
		setTrackIndex(index);
	};

	const filterActiveTrack = (uri: string) => {
		const activeTrack = data?.tracks.items.find((el) => el.uri === uri);
		setActiveUri(activeTrack?.uri!);
	};

	return (
		<section className={scss.SearchResults}>
			<div className="container">
				<div className={scss.content}>
					{isLoading ? (
						<>
							<h1>loading...</h1>
						</>
					) : (
						<>
							<div className={scss.tracks}>
								{data?.tracks.items.map((item, index) => (
									<div
										key={index}
										className={
											activeUri === item.uri
												? `${scss.track} ${scss.active}`
												: `${scss.track}`
										}
										onClick={() => {
											filterActiveTrack(item.uri);
											getTrackUris(index);
										}}>
										<img src={item.album.images[0].url} alt="album" />
										<h5>{item.name}</h5>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default SearchResults;
