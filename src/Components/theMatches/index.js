import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../ui/misc';
import LeagueTable from './table';
import MatchesList from './matchesList';
import './style.scss';

const TheMatches = () => {
	const [ state, setState ] = useState({
		loading: true,
		matches: [],
		filterMatches: [],
		playedFilter: 'All',
		resultFilter: 'All'
	});

	const useViewport = () => {
		const [ width, setWidth ] = useState(process.browser && window.innerWidth);

		useEffect(() => {
			const handleWindowResize = () => setWidth(process.browser && window.innerWidth);
			window.addEventListener('resize', handleWindowResize);
			return () => window.removeEventListener('resize', handleWindowResize);
		}, []);
		// Return the width so we can use it in our components
		return { width };
	};

	const { width } = useViewport();
	const breakpoint = 950;

	useEffect(() => {
		firebaseMatches.once('value').then((snapshot) => {
			const matches = firebaseLooper(snapshot);
			setState((prevState) => {
				prevState.loading = false;
				prevState.matches = reverseArray(matches);
				prevState.filterMatches = reverseArray(matches);
				return { ...prevState };
			});
		});
	}, []);

	const showPlayed = (type) => {
		const list = state.matches.filter((match) => match.final == type);
		setState((prevState) => {
			prevState.filterMatches = type === 'All' ? state.matches : list;
			prevState.playedFilter = type;
			prevState.resultFilter = 'All';
			return { ...prevState };
		});
	};

	const showResult = (result) => {
		const list = state.matches.filter((match) => match.result == result);
		setState((prevState) => {
			prevState.filterMatches = result === 'All' ? state.matches : list;
			prevState.playedFilter = 'All';
			prevState.resultFilter = result;
			return { ...prevState };
		});
	};

	return (
		<div className="the_matches_container">
			{state.loading ? (
				<div className="progress_circular">
					<CircularProgress thickness={5} size={130} style={{ color: '#98c5e9' }} />
				</div>
			) : (
				<div className="the_matches_wrapper">
					<div className="left">
						<div className="match_filters">
							<div className="match_filters_box">
								<div className="tag">Show match</div>
								<div className="cont">
									<div
										className={`option ${state.playedFilter === 'All' ? 'active' : ''}`}
										onClick={() => showPlayed('All')}
									>
										All
									</div>
									<div
										className={`option ${state.playedFilter === 'Yes' ? 'active' : ''}`}
										onClick={() => showPlayed('Yes')}
									>
										Played
									</div>
									<div
										className={`option ${state.playedFilter === 'no' ? 'active' : ''}`}
										onClick={() => showPlayed('no')}
									>
										Not played
									</div>
								</div>
							</div>

							<div className="match_filters_box">
								<div className="tag">Result game</div>
								<div className="cont">
									<div
										className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
										onClick={() => showResult('All')}
									>
										All
									</div>
									<div
										className={`option ${state.resultFilter === 'W' ? 'active' : ''}`}
										onClick={() => showResult('W')}
									>
										W
									</div>
									<div
										className={`option ${state.resultFilter === 'L' ? 'active' : ''}`}
										onClick={() => showResult('L')}
									>
										L
									</div>
									<div
										className={`option ${state.resultFilter === 'D' ? 'active' : ''}`}
										onClick={() => showResult('D')}
									>
										D
									</div>
								</div>
							</div>
						</div>
						<MatchesList matches={state.filterMatches} />
					</div>
					{width > breakpoint && (
						<div className="right">
							<LeagueTable />
						</div>
					)}
				</div>
			)}
			{/* <CircularProgress */}
		</div>
	);
};

export default TheMatches;
