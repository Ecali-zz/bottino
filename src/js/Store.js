import React, {useState} from 'react';

const balance = {
    currency : 35,
    btc : 0.00035
}
export const Context = React.createContext();

const Store = ({children}) => {
    const [state, setState] = useState(balance);

    return(
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
};

export default Store;