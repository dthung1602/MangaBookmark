import React from 'react';
import Header from './Header'
import MangaTable from "./MangaTable";
import LoadMore from "./LoadMore";

class Body extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const data = [
            {
                id: "5cd3cb713615403f7bdc0e9a",
                chapters: [
                    {
                        id: "5cd3cb713615403f7bdc0e9b",
                        isRead: false,
                        "name": "Chapter 5",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-5/465981",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9c",
                        isRead: false,
                        "name": "Chapter 4",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-4/465980",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9d",
                        isRead: false,
                        "name": "Chapter 3",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-3/465979",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9e",
                        isRead: true,
                        "name": "Chapter 2",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-2/465978",
                    },
                    {
                        id: "5cd3cb713615403f7bdc0e9f",
                        isRead: true,
                        "name": "Chapter 1",
                        "link": "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money/chap-1/465210",
                    }
                ],
                name: "The Shocking Reality Of A Loan Shark Collecting Money",
                link: "http://www.nettruyen.com/truyen-tranh/the-shocking-reality-of-a-loan-shark-collecting-money",
                image: "http://st.nettruyen.com/data/comics/203/the-shocking-reality-of-a-loan-shark-col-6168.jpg",
            }
        ];

        const sorter = (x) => x;

        return (
            <div>
                <Header/>
                <MangaTable
                    sorter={sorter}
                    data={data}
                />
                <LoadMore/>
            </div>
        );
    }
}

export default Body;
