import mathsModel from '../models/maths.js';

import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    help() {
        let helpPagePath = path.join(process.cwd(), wwwroot, 'API-Help-Pages/API-Math-Help.html');
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));

    }
    get()
    {
        function isPrime(value) {
            for (var i = 2; i < value; i++) {
                if (value % i === 0) {
                    return false;
                }
            }
            return value > 1;
        }
        function calculateFactorial(n) {
            if(n <= 0){
                return 'NaN';

            }else if
            (n === 0 || n === 1) {
              return 1; 
            } else {
              let factorial = 1;
              for (let i = 2; i <= n; i++) {
                factorial *= i;
              }
              return factorial;
            }
          
          
        }function findPrime(n) {
            let primeNumer = 0;
            for (let i = 0; i < n; i++) {
                primeNumer++;
                while (!isPrime(primeNumer)) {
                    primeNumer++;
                }
            }
            return primeNumer;
        }

        let param = this.HttpContext.path.params;
        let answer = param;
        if(Object.keys(param).length == 0) {
            this.HttpContext.response.JSON("Annexe");
           return;
        }
        
        if(param?.op == null){
            
           answer.error = "paramètres manquants";  
           //this.HttpContext.response.JSON(answer);
        }
        else{
         let op = param.op;
         if(op == ' '|| op == '-'|| op == '*'||op == '/'||op == '%'){
            if( param?.y == null && param?.x == null){
                answer.error = "paramètres manquants";  
                //this.HttpContext.response.JSON(answer);
            }
            else if( Object.keys(param).length > 3){
                answer.error = "paramètres en trop";
            }
            else if("x" in param && "y" in param){
                let y = parseFloat(param?.y);
                let x = parseFloat(param?.x);
            
                if(!isNaN(x) && !isNaN(y)){
                    switch (op) {
                        case " ": 
                            answer.op = "+";
                            answer.value = x + y;
                            break;
                        case "-":
                            answer.value = x - y;
                            break;
                        case "/":
                            if ( x == 0 && y == 0){
                                answer.value = 'NaN'
                            }
                            else{
                                if(x == 0 || y == 0){
                                    answer.value = 'Infinity';
            
                                }
                                else
                                {
                                    answer.value = x / y;
                                }
                            }
                            break;
                        case "*":
                            answer.value = x * y;
                            break;
                        case "%":
                            if(y == 0)
                            {
                              answer.value = 'NaN';
                            }
                            else
                            {
                              answer.value = x % y;
          
                            }
                            break;
                        default:
                            answer.error == null;
                    }

                }else{
                    answer.error = "x ou y sont pas des nombre";
                }

            }
            else{
                answer.error = "paramètres non conforme";
            }    
         }///////
         else if( op == "p"|| op =="!"|| op =="np"){
            if( param?.n == null){
                answer.error = "paramètres manquants";  
            }
            else if( Object.keys(param).length > 2){
                answer.error = "paramètres en trop";
            }
            else if("n" in param ){
                let n = parseFloat(param?.n);
                if(!isNaN(n)){
                    switch (op) {
                        case "p": 
                            if(!Number.isInteger(n)){
                                answer.error="erreur";
                            }
                            else if(n == 0)
                            {
                                answer.error="erreur";
            
                            }else{
                                answer.value = isPrime(n);
                            }
                            
                              break;
                        case "!":
                            if(Number.isFinite(n) && Math.fround(n) === n){
                                answer.error = "erreur";
                            }
                            else{
                                if(calculateFactorial(n) == 'NaN')
                                {
                                answer.error = "erreur";
                                }
                                else{
                                answer.value = calculateFactorial(n);
                                }   

                            }
                                                        
                            break;
                        case "np":
                            
                                answer.value = findPrime(n);
                            
                            break;
                        
                        default:
                            answer.error == null;
                    }


                }
                else{
                    answer.error = "n n'est pas un nombre";
                }
            }
            else{
                answer.error = "erreur";
            }


         }
         else{
            answer.error = "op non connue";
         }
        }
        this.HttpContext.response.JSON(answer);
        
    }
    
}


