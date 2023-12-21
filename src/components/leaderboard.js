import React from 'react';

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div class="h-full w-full">
                <div class="h-1/5 w-11/12 border border-black mx-auto grid grid-cols-10">
                    <div class="relative h-full col-span-1 ">

                    </div>
                    <div class="relative h-full col-span-9 border-l z-50 shadow-xl"></div>
                </div>
            </div>
        )
    }
}

export default LeaderBoard;