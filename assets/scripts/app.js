const AttackValue = 10;
const MonsterAttackValue = 14;
const StronAttackValue = 18;
const Heal_Value = 20;
let enteredvalue = prompt("Enter the maximum health value" , 100);
let bonus = true ;
let ChosenMaximumLife = parseInt(enteredvalue);
if(isNaN(ChosenMaximumLife) || ChosenMaximumLife <= 0)
{
    ChosenMaximumLife =100;
}
let CurrentMonsterHealth = ChosenMaximumLife;
let CurrentPlayerHealth = ChosenMaximumLife;


adjustHealthBars(ChosenMaximumLife);

function AttackHandler(mode)
{
    let maxdamage;
    if(mode=="Simple")
    {
        maxdamage = AttackValue;
    }
    else if(mode == "Strong")
    {
        maxdamage = StronAttackValue;
    }
    const damage = dealMonsterDamage(maxdamage) ;
    CurrentMonsterHealth -= damage ;
    endround()
}

function endround()
{
    const playerdamage = dealPlayerDamage(MonsterAttackValue);
    let initialplayerhealth = CurrentPlayerHealth ;
    CurrentPlayerHealth -=playerdamage;
    if(bonus===true && CurrentPlayerHealth<=0)
    {
        bonus = false
        removeBonusLife();
        CurrentPlayerHealth = initialplayerhealth ;
        setPlayerHealth(initialplayerhealth);
        alert("You are saved here because of bonus point and here your bonus point is zero");
    }
    
    if(CurrentMonsterHealth<=0 && CurrentPlayerHealth>0)
    {
        alert("You Won");
        reset();
    }
    else if(CurrentPlayerHealth<=0 && CurrentMonsterHealth>0)
    {
        alert("Oppss You Loss ");
        reset();
    }
    else if(CurrentMonsterHealth<=0 && CurrentPlayerHealth<=0)
    {
        alert("Match Draw");
        reset();
    }

}

function reset()
{
    CurrentMonsterHealth = ChosenMaximumLife;
    CurrentPlayerHealth = ChosenMaximumLife;
    resetGame(ChosenMaximumLife);
}

function SimpleAttackHandler()
{
    
    AttackHandler("Simple");
}

function StrongAttackHandler()
{
    AttackHandler("Strong");
}

function HealingFunc()
{
    let healvalue ;
    if(CurrentPlayerHealth >= ChosenMaximumLife - Heal_Value)
    {
        alert("You can't heal at this strength");
        healvalue = ChosenMaximumLife - CurrentPlayerHealth;
    }
    else
    {
        healvalue = Heal_Value;
    }
    increasePlayerHealth(healvalue);
    CurrentPlayerHealth = CurrentPlayerHealth + healvalue;
    endround();
}




attackBtn.addEventListener('click',SimpleAttackHandler); 
strongAttackBtn.addEventListener('click',StrongAttackHandler);
healBtn.addEventListener('click',HealingFunc);