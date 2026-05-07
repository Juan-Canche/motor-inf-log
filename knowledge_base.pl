% =========================
% HECHOS
% =========================

employee(juan).
employee(maria).

contract(contract1).
contract(contract2).

breach(contract1).
delay(contract2).

approved(contract2).

% =========================
% REGLAS
% =========================

penalty_applicable(X) :-
    breach(X).

warning_required(X) :-
    delay(X).

valid_contract(X) :-
    approved(X).