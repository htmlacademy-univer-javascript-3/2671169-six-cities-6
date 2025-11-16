import { useEffect, useRef, useState } from "react";

export default function PlacesSorting() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sortingRef = useRef<HTMLFormElement | null>(null);

    const handleOpening = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortingRef.current && !sortingRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <form className="places__sorting" action="#" method="get" ref={sortingRef}>
            <span className="places__sorting-caption">Sort by </span>
            <span
                className="places__sorting-type" tabIndex={0}
                onClick={handleOpening}
            >
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                </svg>
            </span>
            <ul className={`places__options places__options--custom 
                ${isOpen ? "places__options--opened" : ""}`
            }>
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
        </form>
    )
}