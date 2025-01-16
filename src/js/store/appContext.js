import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    await state.actions.loadData();
                    setLoading(false);
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            };

            fetchData();
        }, []);

        if (loading) {
            return <h2 className="text-center text-light bg-dark">Loading...</h2>;
        }

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;