import React, {Component} from 'react';
import AddRoutine from './AddRoutine';
import RoutineList from './RoutineList';
import { observer,inject } from 'mobx-react'
import SelectDaysPopUp from './SelectDaysPopUp';

const Routine = inject("userManager","routineManager")
(observer((props) => {
  
  return (<div>
        <AddRoutine />
        <RoutineList />
       </div>
  ) 
}))
  
  export default Routine;