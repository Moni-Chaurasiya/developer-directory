import {createContext,
        useContext,
        useState,
        useEffect
       } from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const AuthContext=createContext();

export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');

    }
    return context;
}

export const AuthProvider= ({children})=>{


    // const [user, setUser]= useState(()=>{
    //     const storedUser=localStorage.getItem('user');
    //     return storedUser ? JSON.parse(storedUser): null;
    // });
    // const [token, setToken]=useState(()=>localStorage.getItem('token'));


    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);  
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();


 useEffect(() => {
      const initAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    initAuth();
  }, []);


    // useEffect(()=>{
    //     const storedToken=localStorage.getItem('token');
    //     const storedUser= localStorage.getItem('user');
    //     if(storedToken && storedUser){
    //         setToken(storedToken);
    //         setUser(JSON.parse(storedUser))
    //     }
    //     setLoading(false);
    // },[])

    const login= (userData,authToken)=>{
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData))
        toast.success('Login Successful');
        navigate('/')
    }

    const signup=(userData,authToken)=>{
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Account created successfully!');
    navigate('/');
    }

    const logout =()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login')
    }

    const value={
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token
    }
    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

