# Micro-turbojet 0D cycle solver (placeholder — replace with your full solver)
import numpy as np

GAMMA = 1.4
CP = 1004.5
R = 287.05


def compressor_exit(T_in, p_in, pressure_ratio, eta_c):
    tau_ideal = pressure_ratio ** ((GAMMA - 1.0) / GAMMA)
    T_out = T_in * (1.0 + (tau_ideal - 1.0) / eta_c)
    p_out = p_in * pressure_ratio
    work = CP * (T_out - T_in)
    return T_out, p_out, work


def turbine_exit(T_in, p_in, work_required, eta_t):
    delta_t = work_required / (eta_t * CP)
    T_out = T_in - delta_t
    pressure_ratio = (T_out / T_in) ** (GAMMA / (GAMMA - 1.0))
    p_out = p_in * pressure_ratio
    return T_out, p_out


def specific_thrust(v_exit, v_flight):
    return max(v_exit - v_flight, 0.0)
