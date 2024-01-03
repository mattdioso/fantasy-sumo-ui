import React from 'react';

const Home = () => {
    return (
        <div class="h-screen w-full pt-4">
            <h1 class="pl-2">To-Do</h1>
            <ul class="list-disc pl-8">
                <li>Convert everything to TailwindCSS</li>
                <li>Add content to About Page</li>
                <li>Style and format the About Page</li>
                <li>Style and format wrestler cards</li>
                <li><s>Fix scroll on Tournaments Page</s></li>
                <li>Indicate winner in a clearer way for each wrestler match</li>
                <li><s>Fix Scroll on Banzuke page</s></li>
                <li>Fix order of rankings on Banzuke</li>
                <li><s>Fix scroll on Fantasy page</s></li>
                <li>Make team displays smaller so sumo icons look better</li>
                <li>Fix not loading on first request after idle</li>
                <li>Add breakpoints for different screensizes</li>
            </ul>
        </div>
    );
};

export default Home;